
"use client";

import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class Ckeditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || "content",
    };
  }

  handleChange = (event, editor) => {
    const data = editor.getData();
    console.log("onChange fired with data: ", data);
    this.setState({ content: data });

    // Call parent's onChange if provided
    if (this.props.onChange) this.props.onChange(data);
  };

  handleBlur = (event, editor) => {
    console.log("onBlur event called with data: ", editor.getData());
  };

  handlePaste = (event, editor) => {
    console.log("afterPaste event called with data: ", editor.getData());
  };

  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.content}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onPaste={this.handlePaste}
        />
      </div>
    );
  }
}

export default Ckeditor;
