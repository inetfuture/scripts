def package_installed(package_name):
    package_status = run("dpkg-query -W -f='${Status} ' %s && echo OK;true" %s package_name)
    return package_status == 'install ok installed OK'
