import { json } from "@codemirror/lang-json";
import { cn } from "@mm-app/ui/lib/utils";
import { atomone } from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";

export default function JsonCodeEditor(props: {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  className?: string;
}) {
  return (
    <CodeMirror
      value={props.value}
      onChange={props.onChange}
      height={props.height || "300px"}
      theme={atomone}
      className={cn("rounded-xl", props.className)}
      extensions={[json()]}
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
    />
  );
}
