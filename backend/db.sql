create database gestionale_dipendenti;

use gestionale_dipendenti;

insert into utenti(nome, cognome, email, password, is_admin, abilitato)
values('Moreno', 'Frigo Turco', 'mft@gmail.com', '$2a$10$hktcDjcTsg/E0ompUQf6OOktWz352r9LN45NDUKcqPdURj7GE1Hiu', true, true);
-- la password dell'utente è 123456