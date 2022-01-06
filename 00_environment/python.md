# Python

This file contains notes on the installation and configuration of the Python environment.  

Further details: [How to set up a Python development environment?](https://www.laac.dev/blog/setting-up-modern-python-development-environment-ubuntu-20/)

## Prerequisite Packages

```shell
sudo apt-get update; sudo apt-get install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

Further details: [Suggested build environment](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)

## Pyenv

```shell
curl https://pyenv.run | bash
```

Further details: [Pyenv installer](https://github.com/pyenv/pyenv-installer#installation--update--uninstallation)

## Python Path

```shell
~/.profile
# set PATH so it includes pyenv
export PATH="$HOME/.pyenv/bin:$PATH"
# Install autocompletion, rehash shims and install pyenv into the current shell as a shell function
eval "$(pyenv init -)"

~/.bashrc
# Install autocompletion, rehash shims and install pyenv into the current shell as a shell function
eval "$(pyenv init -)"
```

Further details: 
  - [Pyenv documentation](https://github.com/pyenv/pyenv#basic-github-checkout)
  - [Pyenv tutorial](https://code.luasoftware.com/tutorials/linux/install-latest-python-on-ubuntu-via-pyenv/)

## Intellij Plugin (optional)

1. Add Intellij plugin 
2. `sudo apt-get install python3-distutils`

## Install Python Versions

```shell
pyenv install --list
pyenv install --list | grep -E ' 3.9'
pyenv install --list | grep -E ' 2.7'
```

## Create Venv

```shell
- pyenv virtualenv pypy2.7-7.3.1 py-tpcc-venv
- apply venv in intellj -> Python interpreter settings -> gear -> add.. existing environment
- apply venv in terminal -> source /home/sandbox/.pyenv/versions/pypy2.7-7.3.1/envs/py-tpcc-venv/bin/activate
```

## Benchmark

Associate `.j2` with Jinja 2 template
1. go Settings/Preferences | Editor | File Types
2. add `*.j2` to Jinja 2 template