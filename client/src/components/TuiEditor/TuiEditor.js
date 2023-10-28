require('@toast-ui/editor/dist/toastui-editor.css');
require('tui-color-picker/dist/tui-color-picker.css');
require('@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css');
const colorSyntax = require('@toast-ui/editor-plugin-color-syntax');
const Editor = require('@toast-ui/react-editor');

const TuiEditor = ({ content = '', editorRef }) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '}
          initialEditType="markdown"
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
          hideModeSwitch={true}
          height="calc(100% - 10rem)"
          theme={''}
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
    </>
  );
};

export default TuiEditor;
