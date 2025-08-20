# Some notes

## Forward port 80 to 8080

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

## Save iptables rules

```bash
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
```
