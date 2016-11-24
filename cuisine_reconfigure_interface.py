import cuisine


def reconfigure_interface(host, address, netmask, gateway):
    cuisine.connect('test%s' % i)
    # Assume only two interfaces: 'eth*' and 'lo'
    eth_name = cuisine.run('ifconfig -s').split('\n')[1].split()[0]
    interfaces_config = '''auto lo
iface lo inet loopback

auto %(eth_name)s
iface %(eth_name)s inet static
address %(address)s
netmask %(netmask)s
gateway %(gateway)s
dns-nameservers 192.168.1.11
'''
    interfaces_config = interfaces_config % {'eth_name': eth_name,
                                             'address': address,
                                             'netmask': netmask,
                                             'gateway': gateway}
    cuisine.file_update('/etc/network/interfaces', lambda _: interfaces_config)
    cuisine.run('echo "ifdown %(eth_name)s; ifup %(eth_name)s" | at now + 1 minute'
                % {'eth_name': eth_name})

if __name__ == '__main__':
    # Reconfigure test hosts to use successive addresses
    for i in range(2, 12):
        reconfigure_interface('test%s' % i,
                              '192.168.225.%s' % (110 + i),
                              '255.255.255.0',
                              '192.168.225.1')
