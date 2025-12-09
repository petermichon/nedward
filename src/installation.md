# Installation

Install on Debian/Linux distributions.

## Install Git

```bash
sudo apt-get install git
```

## Install Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Note: you may need to restart the terminal.

## Clone the repository

```bash
git clone https://github.com/petermichon/nedward-api.git nedward-api
```

Move inside the codebase

```bash
cd nedward-api/src/
```

## Add HTTPS certificates to the server

Copy and paste your certificates in the secret/ssl.ts file. See secret-template/ssl.ts for an example.

NOTE: see section [About certificates](#about-certificates)

## Serve the website over localhost (https://localhost:8443/)

```bash
deno run dev
```

NOTE: see section [About hosting](#about-hosting)

### About certificates

You can generate self-signed SSL certificates in the current directory by running the command `openssl req -x509 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -days 365 -nodes -subj "/CN=localhost"`.

## About hosting

If you want the backend to run in the background, use `nohup deno run dev &`. Use `pkill deno` to terminate all Deno processes.

## Forward port 80 to 8080 & port 443 to 8443

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8443
```

Note: make sure port forwarding is disabled when creating SSL certificates with Let's Encrypt.

Note: to remove ports forwarding, replace `-A` with `-D` in the previous commands.
