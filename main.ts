import { MarkdownView, Plugin, Editor, moment } from "obsidian";

export default class AutoNumberHeadingsPlugin extends Plugin {
  onload() {
    // 添加快捷键
    this.addCommand({
      id: "auto-number-headings",
      name: "Auto Number Headings",
	  hotkeys: [{ modifiers: ["Mod", "Shift"], key: "m" }],
      editorCallback: (editor: Editor) => {
        console.log("------------");
        this.autoNumberHeadings(editor)
      },
    });


  }


  // 自动为标题添加序号的函数
  autoNumberHeadings(editor: Editor) {
    // 获取 Markdown 编辑器实例
  
	  console.log("1111111111");

    // 获取当前 Markdown 内容
    const markdownContent = editor.getValue();

    // 按行分割 Markdown 内容
    const lines = markdownContent.split("\n");

    // 记录各级标题计数
    let hCount: number[] = [0, 0, 0];

    // 遍历每行内容
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      console.log(line);
      // 判断是否为标题行
      if (line.startsWith("#")) {
        // 获取标题级别
        const level = line.indexOf(" ");

        // 根据标题级别更新计数并为标题添加序号
        lines[i] = this.replaceTitle(hCount, level, line);
        // switch (level) {
        //   case 1:
        //     // lines[i] = `# ${h1Count}.${line.substring(1)}`;
        //     lines[i] = this.replaceTitle(hCount, level, line);
        //     break;
        //   case 2:
          
        //     // lines[i] = `## ${h1Count}.${h2Count}.${line.substring(2)}`;
        //     lines[i] = this.replaceTitle(hCount, level, line);
        //     break;
        //   case 3:
            
        //     // lines[i] = `### ${h1Count}.${h2Count}.${h3Count}. ${line.substring(3)}`;
        //     break;
        // }
      }
    }

    // 更新 Markdown 编辑器内容
    editor.setValue(lines.join("\n"));
  }



  replaceTitle( hCount: number[], level: number, title: string ) {


    let regex2: RegExp = /^\d+\.\d+\.$/;

    const nums: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];


    switch (level){
      case 1:

        hCount[0]++;
        hCount[1] = 0;
        hCount[2] = 0;

        
        
        `# ${hCount[0]}.${title.substring(1)}`;
        break;

      case 2:
        hCount[1]++;
        hCount[2] = 0;
        title.replace("1.", "(一).")

        break;

      case 3:
        hCount[2]++;
        break;

    }

    return title;


  }


}