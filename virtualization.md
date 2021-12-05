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

The bridge network can be created on the host operating system and shared among all VMs: 

**Create a network bridge**  
Create a network bridge using `nm-connection-editor` tool.  
Further details: [How to configure network bridge in Ubuntu?](https://www.linuxhowto.net/how-to-configure-network-bridge-in-ubuntu/)  

**Use existing bridge**  
Configuration done in this step can also be achieved over GUI applying `virt-manager` over `Edit >> Connection details`. 
Configure `libvirt network` to use existing bridge:
```shell
# host-bridge.xml
<network>
	<name>host-bridge</name>
	<forward mode="bridge"/>
	<bridge name="br0"/>
</network>

# create libvirt network using existing host bridge
virsh net-define host-bridge.xml
virsh net-start host-bridge
virsh net-autostart host-bridge

# state should be active, autostart, and persistent
virsh net-list --all

# construct virtual network interface
virsh list --all
virsh edit [mt-ops-manager]|[mt-postgres]

# sample interface
<interface type="bridge">
	<mac address="52:54:00:4f:f2:4c"/>
	<source network="bridged-network" portid="28e66729-4203-4296-a063-9dffd41dfe48" bridge="br0"/>
	<target dev="vnet1"/>
	<model type="virtio"/>
	<link state="up"/>
	<alias name="net1"/>
	<address type="pci" domain="0x0000" bus="0x00" slot="0x07" function="0x0"/>
</interface>
```
   
Further details: 
 - [How to configure libvirt network to use existing bridge?](https://fabianlee.org/2019/04/01/kvm-creating-a-bridged-network-with-netplan-on-ubuntu-bionic/)
 - [How to configure libvirt network to use existing bridge over GUI?](https://www.itzgeek.com/how-tos/linux/ubuntu-how-tos/configure-bridged-networking-for-kvm-on-ubuntu-14-10.html)
     
**Configure iptables**  
**Note:** This is not safe, consider experimentation with such a configuration in isolated lab environments only.
The following sample configuration enables access to VMs from the defined client in LAN: 

```shell
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
	
CONFIG:
	# ops-manager
	sudo iptables -t nat -I PREROUTING -p tcp -d 192.168.52.108 --dport 8080 -j DNAT --to 192.168.122.246:8080
	sudo iptables -I FORWARD -p tcp -d 192.168.122.246 --dport 8080 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
	
	# postgres
	sudo iptables -t nat -I PREROUTING -p tcp -d 192.168.52.108 --dport 5432 -j DNAT --to 192.168.122.120:5432
	sudo iptables -I FORWARD -p tcp -d 192.168.122.120 --dport 5432 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
	
	# mongo-1
	sudo iptables -t nat -A PREROUTING -p tcp -d 192.168.52.108 --dport 27011 -j DNAT --to 192.168.122.155:27017
	sudo iptables -I FORWARD -p tcp -d 192.168.122.155 --dport 27017 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
	
	# mongo-2
	sudo iptables -t nat -A PREROUTING -p tcp -d 192.168.52.108 --dport 27012 -j DNAT --to 192.168.122.82:27017
	sudo iptables -I FORWARD -p tcp -d 192.168.122.82 --dport 27017 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
	
	# mongo-3
	sudo iptables -t nat -A PREROUTING -p tcp -d 192.168.52.108 --dport 27013 -j DNAT --to 192.168.122.196:27017
	sudo iptables -I FORWARD -p tcp -d 192.168.122.196 --dport 27017 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT

SAVE:
	sudo apt install iptables-persistent
	sudo systemctl enable netfilter-persistent.service
	sudo systemctl status netfilter-persistent.service
	iptables-save >/etc/iptables/rules.v4
```

Further details: [How to redirecting network traffic to a new ip using iptables?](https://www.debuntu.org/how-to-redirecting-network-traffic-to-a-new-ip-using-iptables/)

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
