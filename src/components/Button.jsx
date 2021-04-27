import React from "react";


class Button extends React.Component {
  render() {
    return (
      <div className="d-grid gap-2">
        <button onClick={() => this.props.onClick()} className="btn btn-outline-warning btn-lg rounded-pill" style={{ color: "white", backgroundColor: this.props.bcolor }}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;