import { cn } from "@mm-app/ui/lib/utils";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { atomone } from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor(props: {
  value: string;
  onChange: (value: string) => void;
  lang: LanguageName;
  height?: string;
  className?: string;
}) {
  return (
    <CodeMirror
      value={props.value}
      onChange={props.onChange}
      lang={props.lang}
      height={props.height || "300px"}
      theme={atomone}
      className={cn("rounded-xl", props.className)}
      extensions={[loadLanguage(props.lang)!]}
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
    />
  );
}
