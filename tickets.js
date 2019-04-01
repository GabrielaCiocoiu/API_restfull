var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var tickets = [
    { id: 0, from: 'Iasi', to:'Sibiu', seat:'A1', price: 99.99 },
    { id: 1, from: 'Rome', to:'Iasi', seat:'E22',price: 149.95 }
];


app.get('/tickets', function(req, res) {

    res.json(tickets);
});


app.get('/ticket/:id', function(req, res) {
   restickets = req.params.id !== undefined ?
       tickets.filter(     function(obj)   {return obj.id== req.params.id} )
       : tickets;
   res.json(restickets);
});

app.post('/tickets', function(req, res) {
   const ticket = {
    id: [tickets.length + 1] - 1,
    from: req.body.from,
    to: req.body.to,
    seat: req.body.seat,
    price: req.body.price
  };
  tickets.push(ticket);
  res.json(ticket);
  //res.json({ message: `A new ticket was created.`});
  
});

app.put('/ticket/:id', function(req, res) {

  var ticketId = req.params.id;
  var ticket = tickets.filter (ticket => {return ticket.id == ticketId })[0];
  const index = tickets.indexOf(ticket);
  var keys = Object.keys(req.body);
  keys.forEach(key => {
    ticket[key] = req.body[key];
  });
  tickets[index] = ticket;
  //res.json({ message: `Ticket ${ticketId} updated.`});
  res.json(tickets[index]);
});


app.delete('/ticket/:id', function(req, res) {
  
  var ticketId = req.params.id;
  var ticket = tickets.filter(     ticket =>  {return ticket.id== ticketId} )[0];
  const index = tickets.indexOf(ticket);
  tickets.splice(index, 1);
  res.json({ message: `Ticket ${ticketId} deleted.`});

});

//app.delete('/tickets', function(req, res) {
    //tickets.splice();
    //res.json({ message: `Tickets deleted.`});
//});

app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});