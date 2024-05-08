# A faire

On a créé une API qui envoie les moteurs en JSON _(/api/moteurporsche)_

Maintenant, il faut faire la même chose mais avec `/api/gammeporsche`


Pour tester, tu peux le faire avec le web, mais c'est mieux avec "curl":

```shell
curl -i http://172.18.126.3:3000/api/gammeporsche
```

Ensuite montre moi en `curl` comment ajouter une voiture. Pour les moteurs, la commande est:

```shell
curl -i -XPOST -d 'moteur=aba' -d 'carburant=Essence' -d 'puissance=1050' http://172.18.126.3:3000/api/moteurporsche
```