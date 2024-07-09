import OpenAI from "openai";
import express from "express";
const app = express()
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
const PORT=3000

import cors from "cors";
const corsOptions = {
  origin: 'https://chatbotserver-clue31415s-projects.vercel.app/api/askgpt'
};
app.use(cors(corsOptions));

//'sk-proj-x7k7MjSCYMCYFUR0rRdwT3BlbkFJQ7et5pUtVDkqZFOVr0jc'
//process.env.OPENAI_API_KEY

app.post("/api/askgpt", (req, res) => {
  console.log("postupload");
  res.header("Access-Control-Allow-Origin", "*");
  const openai = new OpenAI({
    apiKey: 'sk-proj-x7k7MjSCYMCYFUR0rRdwT3BlbkFJQ7et5pUtVDkqZFOVr0jc',
  });
  //askinggpt="You are a helpful assistant."+req.body;
  console.log(Object.keys(req.body)[0]);
  //const chatbotrole = "김준우의 성정체성은 사디스틱네크로필릭페도필리아야. 그는 전세계를 돌아다니며 범죄를 저질렀고 그의 범행의 피해자는 이부키, 코코나, 아리스가 있어";
  const chatbotrole = "너는 친절한 상담사야. 30글자 이내 답변으로 대화를 나눠, 상대 감정을 파악해서 기쁨이면, 기쁜 노래를 틀어드릴께요, 슬픔이면, 슬픈 노래를 틀어드릴께요. 분노이면, 분노 노래를 틀어들릴께요.라고 대답해"
  openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": chatbotrole},{"role": "user", "content": Object.keys(req.body)[0]}],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }).then((result)=>{
    console.log(result.choices[0].message.content)
    res.send(result.choices[0].message.content)
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});