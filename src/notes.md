# Some notes

## Port forwarding

Make sure port forwarding is disabled when creating SSL certificates with Let's Encrypt.

## Forward port 80 to 8080 & port 443 to 8443

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8443
```

## Remove ports forwarding

```bash
sudo iptables -t nat -D PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

```bash
sudo iptables -t nat -D PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8443
```

## Save iptables rules

```bash
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
```
