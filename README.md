# SplitLah! - The Singaporean app to track shared expenses!

Meeting up friends and colleagues for different activities is fun! However, dealing with money takes some fun away! This app is intended to be used to keep track of money spent in group setting and make it easier settle with each other


## 💡Introduction & Motivation

This app is to simplify the group expense tracking mechanism. As part of future improvement, also want to add a local flavour by integrating with local payment methods like pay-now & pay-lah!


## 🧑‍💼User Story / Experience

From user's perspective, there are 3 main buckets of features he can interact with

1. User Login / Registration
2. View Expenses and final account state
   2a) View summary at group level
   2b) View summary with indivudals inside a group
   2c) View all transactions entered in past within a group
3. Add new expenses and other details
   3a) Create new group (Also, able to invite new members)
   3b) Edit group (Add new members etc)
   3c) Add new expense transaction
   3d) Edit a transaction entered by user

Some of the strech target features include following (Yet to be completed):

1. User able to store his profile pic
2. User being able to make payment via paynow / paylah


## 📺 Visuals - User Interface

The user login and user registration pages looks as follows:
![Login and Registration](/apps/client/src/images/loginRegistrationGif_v3.gif)

The pages which display overall money oweing status is shown in the following gif. Overall, the details can be seen at 3 levels:

- Overall summary with all the groups
- Individual level within a group
- Transaction level
  ![Monetary Status](/apps/client/src/images/View_Transactions_v1.gif)

The pages which enable the user to create new groups or enter new transactions is shown in the following gif:
![Txn/ Group Update](/apps/client/src/images/Add_Transactions_group.gif)
.


## 🏗️ Program Architecture

![Back-End Architecture](/apps/client/src/images/BackEnd%20Architecture.jpg)

![Front-End Architecture](/apps/client/src/images/FrontEnd%20Architecture.jpg)


## 🪜 Key Challenges & Learning

Working as a team on same program was an unique experience.
We systematically divided the project into sub-section and divided amongst us.
[Link to sub-sections and planning](https://docs.google.com/spreadsheets/d/1VVXgjrptBwsrz9G4e1zM8mdpqAFBvm4WZ3t_itfZOc4/edit?usp=share_link)
[Link to Common Rules agreed](https://docs.google.com/document/d/1p-guP6gnfDuwsT9w-_g8t1SW-muOY0JWi8FJQ3KuEks/edit?usp=share_link)


## 🖥️ Technologies & Libraries Used
- React
- HTML, CSS (BootStrap)
- Redux
- NodeJS / Express (bcrypt, sessions)
- Mongo DB
