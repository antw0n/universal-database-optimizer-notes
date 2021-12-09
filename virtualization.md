# Virtualization

This file contains notes on installation and configuration of virtualization layer.

**Sample Virtual Machines**

| Hostname        | IP              | Port  | 
| --------------- |:---------------:| -----:|
| mt-ops-manager  | 192.168.122.246 | 8080  |
| mt-postgres     | 192.168.122.120 | 5432  |
| mt-mongo-1      | 192.168.122.155 | 27017 |
| mt-mongo-2      | 192.168.122.82  | 27017 |
| mt-mongo-3      | 192.168.122.196 | 27017 |

Further details:

- [How to install multiple Ubuntu VMs using Multipass on Ubunut 20.04?](https://www.how2shout.com/linux/how-to-install-mutliple-ubuntu-vms-using-multipass-on-ubunut-20-04/)
- [How to use virt-manager GUI to manage Multipass Ubuntu VMs?](https://www.how2shout.com/linux/how-to-use-virt-manager-gui-to-manage-multipass-ubuntu-vms/)

## Multipass, virlib and VMM 

Install and use `Multipass` together with `virlib` and `VMM`:

```shell
1. sudo apt update
2. sudo snap install multipass 
3. sudo apt install virt-manager libvirt-daemon-system
4. snap connect multipass:libvirt
5. multipass stop --all
6. multipass set local.driver=libvirt
```

## Non-Root VMM

Use `virt-manager` as a non-root user:
```shell
1. sudo usermod -a -G libvirt $(whoami)
2. newgrp libvirt
3. id $(whoami)
4. sudo gedit /etc/libvirt/libvirtd.conf
	> unix_sock_group = "libvirt"
	> unix_sock_rw_perms = "0770"
5. sudo systemctl restart libvirtd.service
6. logout - login
```
Further details: [How to use virt-manager as non-root user?](https://computingforgeeks.com/use-virt-manager-as-non-root-user/)  

## Launch VMs

Launch commands for creation of new VMs:

```shell
multipass launch -n [mt-ops-manager]|[mt-postgres] -c 2 -m 8G -d 50G
multipass launch -n [mt-mongo-1]|[mt-mongo-2][mt-mongo-3] -c 2 -m 8G -d 25G
```

## Resize Disk

Resize disk if running out of space:

`[vm]` refers to one of `[mt-ops-manager]|[mt-postgres][mt-mongo-1]|[mt-mongo-2][mt-mongo-3]`

```
1. open virt-manager > open [vm] > open virtual hw details > open VirtIO Disk 1 > select <source>
3. multipass stop [vm] && close virt-manager if open
2. sudo qemu-img resize --preallocation='full' /var/snap/multipass/common/data/multipassd/vault/instances/[vm]/ubuntu-20.04-server-cloudimg-amd64.img +45G
```

## Network

**Note:** This is not safe, consider experimentation with such a configuration in the isolated lab environments only.  

See: [adjust_iptables.sh](adjust_iptables.sh)  

The `libvirt network` can be exposed to LAN using the script `adjust_iptables.sh`:  

```shell
# Add
adjust_iptables.sh mt-postgres start
adjust_iptables.sh mt-mongo-1 start
adjust_iptables.sh mt-mongo-2 start
adjust_iptables.sh mt-mongo-3 start

# Remove
adjust_iptables.sh mt-postgres stopped
adjust_iptables.sh mt-mongo-1 stopped
adjust_iptables.sh mt-mongo-2 stopped
adjust_iptables.sh mt-mongo-3 stopped

IP FORWARDING:
	check: sudo sysctl -a|grep net.ipv4.ip_forward
	adjust:
		- net.ipv4.ip_forward=1, enabled
		- net.ipv4.ip_forward=0, disabled

PREROUTING:
	list: sudo iptables -t nat -v -L -n --line-number
	delete: sudo iptables -t nat -D PREROUTING {rule-number-here}
	
FORWARD: 
	list: sudo iptables -L FORWARD -v --line-numbers
	delete: sudo iptables -D FORWARD {rule-number-here}

SAVE:
	sudo apt install iptables-persistent
	sudo systemctl enable netfilter-persistent.service
	sudo systemctl status netfilter-persistent.service
	iptables-save >/etc/iptables/rules.v4
```
Further details: 
 - [How to configure libvirt network?](https://wiki.libvirt.org/page/Networking)
 - [How to redirecting network traffic to a new ip using iptables?](https://www.debuntu.org/how-to-redirecting-network-traffic-to-a-new-ip-using-iptables/)

# Mount Disk

Mounting a disk allows separation of the data from image based runtime environment.

`[vm-strg]` refers to one of `/mnt/mt-ops-manager-strg | /mnt/mt-mongo-[1|2|3]-strg`

**Virtual Machine Manager**
1. Edit -> Connection Details -> Storage
	1. Add pools
	2. Add volumes
2. Start per sudo -> choose vm -> show virtual machine information -> Add Hardware
	1. Storage -> select or create custom storage -> Add volume

**Commands**
```shell
1. sudo fdisk -l | grep '^Disk /dev/vd[a-z]'
2. sudo fdisk /dev/vdc
    1. Type n for a new partition. 
    2. Type p for a primary partition. 
    3. Choose an available partition number 1. 
    4. Enter the default first cylinder by pressing Enter. 
    5. Choose the entire disk is allocated by pressing Enter. 
    6. Finally type p to verify new partition. 
    7. Enter w to write changes and quit.	
3. sudo mkfs.ext4 /dev/vdc1
4. sudo mkdir `[vm-strg]`
5. sudo mount /dev/vdc1 `[vm-strg]`
6. sudo nano /etc/fstab
   /dev/vdb1                /disk2        ext4     defaults    0 0
   LABEL=cloudimg-rootfs   /              ext4     defaults    0 1
   LABEL=UEFI              /boot/efi      vfat     umask=0077  0 1
   /dev/vdc1               `[vm-strg]`    ext4     defaults    0 0 <--- add this line
7. sudo chown -R mongodb:mongodb `[vm-strg]`
```
Further details: [How to add disk image to kvm virtual machine?](https://www.cyberciti.biz/faq/how-to-add-disk-image-to-kvm-virtual-machine-with-virsh-command/)

## Configure /etc/hosts
**Note:** Do not forget to configure the `/etc/hosts` on client and host.  
Add the following entries according to the VM:

```shell
sudo nano /etc/cloud/cloud.cfg

# The modules that run in the 'final' stage
cloud_final_modules:
	# runcmd on every boot
	- [scripts-user, always]

# ops-manager /etc/hosts additional configuration 
runcmd:
    - echo "192.168.122.155 mt-mongo-1" >> /etc/hosts
    - echo "192.168.122.82 mt-mongo-2" >> /etc/hosts
    - echo "192.168.122.196 mt-mongo-3" >> /etc/hosts

# mt-mongo-1 /etc/hosts additional configuration 
runcmd:
    - echo "192.168.122.82 mt-mongo-2" >> /etc/hosts
    - echo "192.168.122.196 mt-mongo-3" >> /etc/hosts
    
# mt-mongo-2 /etc/hosts additional configuration    
runcmd:
    - echo "192.168.122.155 mt-mongo-1" >> /etc/hosts
    - echo "192.168.122.196 mt-mongo-3" >> /etc/hosts

# mt-mongo-3 /etc/hosts additional configuration    
runcmd:
    - echo "192.168.122.155 mt-mongo-1" >> /etc/hosts
    - echo "192.168.122.82 mt-mongo-2" >> /etc/hosts

# Verify
sudo cloud-init clean --logs --reboot
cat /etc/hosts
sudo cloud-init status --long
```
