# A faire

On a transformé `/api/moteurporsche` en API "RESTFull", c'est à dire en utilisant les 4 verbes.

1. Fais la même chose pour `/api/gammeporsche`
2. Teste avec "curl". Voici les commandes que j'ai utilisé pour `/api/moteurporsche`

```shell
# Liste
curl http://172.18.126.3:3000/api/moteurporsche | jq -S
# Ajout
curl -XPOST -H 'Content-Type: application/json' -d '{"moteur":"V18","carburant":"Gasoil","puissance":240}' http://
172.18.126.3:3000/api/moteurporsche
# Liste
curl http://172.18.126.3:3000/api/moteurporsche | jq -S
# Effacement
curl -XDELETE http://172.18.126.3:3000/api/moteurporsche/V1
```

Crée des commandes "curl" pour tester ton API et écris les ici

```shell
# Comandes curl pour lister, ajouter et effacer
curl ...
```

3. Ajoute un contrôle pour `POST` et `PUT` qui vont bien vérifier que le moteur de la voiture existe déjà.

A chaque étape, n'oublie pas de "commiter" et synchroniser avec GitHub :wink:


## API "REST full"

L'URL doit être explicite. Exemple pour des livres: `/`books`/`nom-du-livre

4 verbes :
 * `GET`: lire. Exemple: `curl http://serveur:3000/books`
 * `POST`: créer. Exemple: `curl -XPOST -d '{le JSON décrivant le nouveau livre}' http://serveur:3000/books`
 * `PUT`: modifier. Exemple: `curl -XPUT -d '{le JSON de la modification}' http://serveur:3000/books/Livre123`
 * `DELETE`: effacer. Exemple: `curl -XDELETE http://serveur:3000/books/Livre124`