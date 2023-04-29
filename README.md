# TO00BS65-3003_Projects

This is a repository for project 3 of the Full Stack Development Laurea course

Project 3: REACT front-end
By Facundo Goncalves Borrega
Student ID: 2106497

## Render URL

- https://full-stack-ope-fgb-p3.onrender.com/

---

## Application description

IMPORTANT : Sometimes, if the page hasn't been loaded for some days, once you try to load the webpage, it can take maybe 5 minutes for the webservice hosting the page to "wake up" but only the first time. This is because of Render.

If an error mentioning that "MyForm" is missing, it's because the webservice is still implementing the code.

The same goes for the API used. When the webpage is loaded, a lot of invoices have to be loaded but on the first loading it can take 5 minutes.

If after 5 minutes, invoices are not loaded at start, usually what works to wake the API up is to call it from postman just 1 time. GET  https://full-stack-ope-fgb-p2.onrender.com/api/getall

Description:

It's a simple webpage that let's you administrate invoices. It is made in REACT and styles in bootstrap. It's preferable to test it with Google Chrome.

This webpage shows you all the available invoices as soon as ou enter. It let's you filter them by "Invoice Name", it let's you create a new one, it let's you get one invoice in specific instead of all, update one or all the fields in an invoice and finally it let's you delete an invoice by ID.

This webpage interacts with the REST API that was created by me in project 2. The webpage interacts with the 5 possible ways to call the API:

GET https://full-stack-ope-fgb-p2.onrender.com/api/getall Returns all invoices in collection - Returnos all (max 20) documents in the collcetion, in an array.
GET https://full-stack-ope-fgb-p2.onrender.com/api/:id Returns one invoice with the given id
POST https://full-stack-ope-fgb-p2.onrender.com/api/add Creates a new invoice in the collection
PUT https://full-stack-ope-fgb-p2.onrender.com/api/update/:id Updates the invoice with the given id. It tries to update only the part that you put in the json and just for that invoice.
DELETE https://full-stack-ope-fgb-p2.onrender.com/api/delete/:id Deletes the invoice with the given id and if it was successfull, will show you which invoice it deleted.

## Criteria for assignemnt

https://github.com/jukmali/Full-Stack-Master/blob/main/projects/project_3.pdf
