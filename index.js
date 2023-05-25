import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import adminRouter from './router/admin.js';
import userRouter from  "./router/user.js"
import dreamRouter from "./router/dream.js"
import { config } from './config.js';
// import kakaoRouter from "./router/kakao.js"
import morgan from 'morgan';

const app = express();
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(cors(corsOption))
app.use(morgan("tiny")); // 요청온거 확인하게 
app.use("/", adminRouter);
app.use("/user", userRouter); // 회원관리 
app.use("/safedream", dreamRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})
// 서버에러
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
});



app.listen(config.host.port, () => {
    console.log(`Server is running on port ${config.host.port}`);
});

