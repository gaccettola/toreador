
### load up a couple thousand requests, 
up to around 4000 rps is reasonable on laptop hardware
```
loadtest -c 10 --rps 200 http://localhost:27979/
```