#!/bin/bash

# IMPORTANT: Change the "VM NAME" string to match your actual VM Name.
# In order to create rules to other VMs, just duplicate the below block and configure
# it accordingly.
if [ "${1}" = "mt-mongo-1" ]; then

   # Update the following variables to fit your setup
   GUEST_IP=192.168.122.155
   GUEST_PORT=27011
   HOST_PORT=27011

   if [ "${2}" = "stopped" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -D FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -D PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
   if [ "${2}" = "start" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -I FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -I PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
fi
if [ "${1}" = "mt-mongo-2" ]; then

   # Update the following variables to fit your setup
   GUEST_IP=192.168.122.82
   GUEST_PORT=27012
   HOST_PORT=27012

   if [ "${2}" = "stopped" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -D FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -D PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
   if [ "${2}" = "start" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -I FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -I PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
fi
if [ "${1}" = "mt-mongo-3" ]; then

   # Update the following variables to fit your setup
   GUEST_IP=192.168.122.196
   GUEST_PORT=27013
   HOST_PORT=27013

   if [ "${2}" = "stopped" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -D FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -D PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
   if [ "${2}" = "start" ] || [ "${2}" = "reconnect" ]; then
	/sbin/iptables -I FORWARD -o virbr0 -p tcp -d $GUEST_IP --dport $GUEST_PORT -j ACCEPT
	/sbin/iptables -t nat -I PREROUTING -p tcp --dport $HOST_PORT -j DNAT --to $GUEST_IP:$GUEST_PORT
   fi
fi