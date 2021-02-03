import React, { Component } from 'react';
import ConfirmationModal from '../components/Modals/ConfirmationModal';

export const ConfirmationContext = React.createContext({
  // eslint-disable-next-line no-unused-vars
  confirmAction: (title, text, onConfirm) => {},
});

export class ConfirmationDialogProvider extends Component {
  state = {
    showConfirmation: false,
    confirmationActionTitle: '',
    confirmationActionText: '',
    onConfirm: () => {},
  };

  confirm = (title, text, onConfirm) => {
    this.setState({
      showConfirmation: true,
      confirmationActionTitle: title,
      confirmationActionText: text,
      onConfirm: () => {
        onConfirm();
        this.closeModal();
      },
    });
  };

  closeModal = (e) => {
    this.setState({
      showConfirmation: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <ConfirmationContext.Provider
        className="Provider"
        value={{
          confirmAction: this.confirm,
        }}
      >
        <ConfirmationModal
          isOpen={this.state.showConfirmation}
          title={this.state.confirmationActionTitle}
          text={this.state.confirmationActionText}
          onConfirm={this.state.onConfirm}
          onClose={this.closeModal}
          namespace={this.state.namespace}
        />
        {children}
      </ConfirmationContext.Provider>
    );
  }
}

export const withConfirmation = (WrapperComponent) => (props) => (
  <ConfirmationContext.Consumer>
    {(state) => (
      <WrapperComponent confirmationContext={{ ...props.context, ...state }} {...props} />
    )}
  </ConfirmationContext.Consumer>
);
