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

Et quand ça marche, n'oublie pas de "commiter" et synchroniser avec GitHub :wink:


## API "REST full"

L'URL doit être explicite. Exemple pour des livres: `/`books`/`nom-du-livre

4 verbes :
 * `GET`: lire. Exemple: `curl http://serveur:3000/books`
 * `POST`: créer. Exemple: `curl -XPOST -d '{le JSON décrivant le nouveau livre}' http://serveur:3000/books`
 * `PUT`: modifier. Exemple: `curl -XPUT -d '{le JSON de la modification}' http://serveur:3000/books/Livre123`
 * `DELETE`: effacer. Exemple: `curl -XDELETE http://serveur:3000/books/Livre124`