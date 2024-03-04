export function subjectpaser(subjecttxt: string) {
    const match = subjecttxt.match(/^(\d+)\.dat<>(.+) \((\d+)?\)$/);
    if (match) {
      const [_, unixtime, threadName, responseCount] = match;
      const result = {
        [`${unixtime}`]: [threadName, responseCount || null],
      };
      return result;
    }
}
export function newsubject(subjecttxt: string,title: string,unixtime:number) {
    return `${unixtime}.dat<>${title}\n${subjecttxt}`;
}
/**
 * Parses a string of data and returns a JSON string representation of the parsed data.
 * @param dattxt - The string of data to be parsed.
 * @returns A JSON string representation of the parsed data.
 */
export function datpaser(dattxt: string) {
    const lines = dattxt.split("\n");
    const posts: any[] = [];
    let title = "";
  
    lines.forEach((line, index) => {
      const parts = line.split("<>");
      if (parts.length >= 4) {
        if (index === 0) {
          title = parts[4];
        }
        const post: any = {
          postid: (index + 1).toString(),
          name: parts[0],
          mail: parts[1],
          date: parts[2],
          message: index === 0 ? parts[4] : parts[3],
        };
        posts.push(post);
      }
    });
  
    const result = {
      title: title,
      post: posts,
    };
  
    return JSON.stringify(result, null, 2);
  }
export function newdat(name: string,mail: string,message: string,DATAS:number,title: string) {
    return `${name}<>${mail}<>${DATAS}<>${message}<>${title}`;
}
export function postdat(dattxt: string,name: string,mail: string,message: string,DATAS:number) {
    return `${dattxt}\n${name}<>${mail}<>${DATAS}<>${message}`;
}