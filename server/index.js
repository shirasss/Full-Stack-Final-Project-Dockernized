let express = require('express');
let app = express();

const connection = require('./routes/connectionRouter')
const classificationRouter = require('./routes/classificationRouter')
const categoryRouter = require('./routes/cateroryRouter')
const manageitemRouter = require('./routes/manageItemRouter')
const itemsRouter = require('./routes/itemsRouter')
const bagRouter = require('./routes/bagRouter')
const stockRouter = require('./routes/stockRouter.js')
const sizesRouter=require('./routes/sizesRouter')
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));


app.use('/api/connection', connection);
app.use('/api/manageitem', manageitemRouter);
app.use('/api/classification', classificationRouter);
app.use('/api/items/stock', stockRouter)
app.use('/api/category', categoryRouter);
app.use('/api/items', itemsRouter);
app.use('/api/bag', bagRouter);
app.use('/api/sizes', sizesRouter);

app.listen(3001);