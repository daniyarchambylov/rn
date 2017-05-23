#!/usr/bin/env python
import argparse
import subprocess


def main():
    parser = argparse.ArgumentParser(description='Dockerized manage.py command tool')
    parser.add_argument('command', help='manage.py command', nargs=argparse.REMAINDER)
    parser.add_argument('-p', '--production', action='store_true',
                        help='Runs command under production environment')

    args = parser.parse_args()
    commands = ['docker-compose']

    if args.production:
        commands += ['-f', 'production.yml']

    commands += ['exec', 'backend', 'python', 'manage.py']

    if len(args.command) > 0:
        commands += args.command
    subprocess.call(commands)

if __name__ == '__main__':
    main()
