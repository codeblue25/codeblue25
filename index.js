import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `
### 👋 Hi there 

<p>FE Developer 🚀</p>

### 💪 Skills

<p>
    <img alt="vuejs-logo" src= "https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=34495E" /> 
    <img alt="javascript-logo" src= "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white" /> 
    <img alt="typescript-logo" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=3178C6" />
    <img alt="sass-logo" src= "https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white" />
</p>

### 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://codeblue25.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 2; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a><br />`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
})();