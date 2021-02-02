/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './styles/contentEditorStyle.jsx';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Content Editor", props);
    this.state = {
      editorState: null,
    };
  }

  setEditorReference = (ref) => {
    this.editorReferece = ref;

    if (this.props.autoFocus === true && ref) {
      ref.focus();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.editorState && props.content) {
      return {
        editorState: EditorState.createWithContent(convertFromRaw(props.content)),
      };
    }

    return null;
  }

  onEditorStateChange = (editorState) => {
    this.setState(
      {
        editorState,
      },
      () => {
        if (this.props.onChange && editorState) {
          this.props.onChange(editorState);
        }
      },
    );
  };

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    const optionToolbar = {
      // options: [
      //   "inline",
      //   "blockType",
      //   "list",
      //   "textAlign",
      //   'image',
      //   "remove",
      //   "history"
      // ],
      // blockType: {
      //   inDropdown: true,
      //   options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"]
      // }

      options: [
        'inline',
        'blockType',
        'fontSize',
        'fontFamily',
        'list',
        'textAlign',
        'colorPicker',
        'link',
        'embedded',
        'emoji',
        'image',
        'remove',
        'history',
      ],
      inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'monospace',
          'superscript',
          'subscript',
        ],
        bold: { icon: <FormatBoldIcon />, className: undefined },
        //italic: { icon: italic, className: undefined },
        //underline: { icon: underline, className: undefined },
        //strikethrough: { icon: strikethrough, className: undefined },
        //monospace: { icon: monospace, className: undefined },
        //superscript: { icon: superscript, className: undefined },
        //subscript: { icon: subscript, className: undefined },
      },
      blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
      },
      fontSize: {
        //icon: fontSize,
        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
      },
      fontFamily: {
        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
      },
      list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['unordered', 'ordered', 'indent', 'outdent'],
        //unordered: { icon: unordered, className: undefined },
        //ordered: { icon: ordered, className: undefined },
        //indent: { icon: indent, className: undefined },
        //outdent: { icon: outdent, className: undefined },
      },
      textAlign: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['left', 'center', 'right', 'justify'],
        //left: { icon: left, className: undefined },
        //center: { icon: center, className: undefined },
        //right: { icon: right, className: undefined },
        //justify: { icon: justify, className: undefined },
      },
      colorPicker: {
        //icon: color,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        colors: [
          'rgb(97,189,109)',
          'rgb(26,188,156)',
          'rgb(84,172,210)',
          'rgb(44,130,201)',
          'rgb(147,101,184)',
          'rgb(71,85,119)',
          'rgb(204,204,204)',
          'rgb(65,168,95)',
          'rgb(0,168,133)',
          'rgb(61,142,185)',
          'rgb(41,105,176)',
          'rgb(85,57,130)',
          'rgb(40,50,78)',
          'rgb(0,0,0)',
          'rgb(247,218,100)',
          'rgb(251,160,38)',
          'rgb(235,107,86)',
          'rgb(226,80,65)',
          'rgb(163,143,132)',
          'rgb(239,239,239)',
          'rgb(255,255,255)',
          'rgb(250,197,28)',
          'rgb(243,121,52)',
          'rgb(209,72,65)',
          'rgb(184,49,47)',
          'rgb(124,112,107)',
          'rgb(209,213,216)',
        ],
      },
      link: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        dropdownClassName: undefined,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link', 'unlink'],
        //link: { icon: link, className: undefined },
        //unlink: { icon: unlink, className: undefined },
        linkCallback: undefined,
      },
      emoji: {
        //icon: emoji,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        emojis: [
          '😀',
          '😁',
          '😂',
          '😃',
          '😉',
          '😋',
          '😎',
          '😍',
          '😗',
          '🤗',
          '🤔',
          '😣',
          '😫',
          '😴',
          '😌',
          '🤓',
          '😛',
          '😜',
          '😠',
          '😇',
          '😷',
          '😈',
          '👻',
          '😺',
          '😸',
          '😹',
          '😻',
          '😼',
          '😽',
          '🙀',
          '🙈',
          '🙉',
          '🙊',
          '👼',
          '👮',
          '🕵',
          '💂',
          '👳',
          '🎅',
          '👸',
          '👰',
          '👲',
          '🙍',
          '🙇',
          '🚶',
          '🏃',
          '💃',
          '⛷',
          '🏂',
          '🏌',
          '🏄',
          '🚣',
          '🏊',
          '⛹',
          '🏋',
          '🚴',
          '👫',
          '💪',
          '👈',
          '👉',
          '👉',
          '👆',
          '🖕',
          '👇',
          '🖖',
          '🤘',
          '🖐',
          '👌',
          '👍',
          '👎',
          '✊',
          '👊',
          '👏',
          '🙌',
          '🙏',
          '🐵',
          '🐶',
          '🐇',
          '🐥',
          '🐸',
          '🐌',
          '🐛',
          '🐜',
          '🐝',
          '🍉',
          '🍄',
          '🍔',
          '🍤',
          '🍨',
          '🍪',
          '🎂',
          '🍰',
          '🍾',
          '🍷',
          '🍸',
          '🍺',
          '🌍',
          '🚑',
          '⏰',
          '🌙',
          '🌝',
          '🌞',
          '⭐',
          '🌟',
          '🌠',
          '🌨',
          '🌩',
          '⛄',
          '🔥',
          '🎄',
          '🎈',
          '🎉',
          '🎊',
          '🎁',
          '🎗',
          '🏀',
          '🏈',
          '🎲',
          '🔇',
          '🔈',
          '📣',
          '🔔',
          '🎵',
          '🎷',
          '💰',
          '🖊',
          '📅',
          '✅',
          '❎',
          '💯',
        ],
      },
      embedded: {
        //icon: embedded,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        embedCallback: undefined,
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
      image: {
        //icon: image,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: () => {
          return {};
        },
        previewImage: false,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
      remove: {
        //icon: eraser,
        className: undefined,
        component: undefined,
      },
      history: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['undo', 'redo'],
        undo: {
          //  icon: undo,
          className: undefined,
        },
        redo: {
          //icon: redo,
          className: undefined,
        },
      },
    };

    return (
      <Editor
        editorRef={this.setEditorReference}
        className={classes.root}
        editorState={editorState}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
        toolbar={optionToolbar}
        textAlignment="left"
        stripPastedStyles={true}
        onEditorStateChange={this.onEditorStateChange.bind(this)}
      />
    );
  }
}

ContentEditor.propTypes = {
  content: PropTypes.object,
  classes: PropTypes.object,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
};

export default withStyles(styles)(ContentEditor);

export const convertHtmlToDraft = (content) => {
  if (content) {
    if (typeof content === 'string') {
      const contentBlock = htmlToDraft(content);
      return contentBlock
        ? EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock))
        : EditorState.createEmpty();
    } else {
      return content;
    }
  }
  return EditorState.createEmpty();
};

export const convertDraftToHtml = (editorState) => {
  let content = editorState.getCurrentContent();
  if (content) return draftToHtml(convertToRaw(content));
  return '<p></p>';
};
