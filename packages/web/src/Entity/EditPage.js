import React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import { Paper, Button } from '@material-ui/core';
import ValidationForm from '../components/Validations/Form';

import swal from 'sweetalert';

class EntityEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enableEdit: true,
      allowLeave: false,
    };
  }

  //TODO convert to hooks and Typescript
  UNSAFE_componentWillMount() {
    const { match, keyField, mode, defaultEntity, entity } = this.props;
    let id = match.params ? match.params.id : '0';

    if (
      !isNaN(id) &&
      entity &&
      (!entity[keyField] || entity[keyField].toString() !== match.params.id.toString())
    ) {
      this.props.getEntity(match.params.id, (entity) => {
        this.props.initializeForm(entity);
      });
    } else if (mode === 'add' && defaultEntity) {
      this.props.initializeForm(defaultEntity);
    } else {
      //console.log("Init current Entity");
      this.props.initializeForm(entity);
    }
  }

  handleSave(entity, e) {
    const { reset, onSubmitForm, ignoreReset } = this.props;
    if (onSubmitForm) {
      onSubmitForm(entity);
    } else {
      this.props.actions.saveEntity(entity, {
        onSuccess: () => {
          if (reset && !ignoreReset) reset();
          this.setState({ allowLeave: true }, () => {
            window.history.back();
          });
        },
      });
    }
  }

  handleGoBack() {
    if (this.props.dirty === true) {
      this.setState({ allowLeave: true }, () => {
        swal({
          title: 'Are you sure want to leave this page?',
          text: 'You have pending changes not saved yet',
          icon: 'warning',
          buttons: ['No', 'Yes'],
          dangerMode: true,
        }).then((cancel) => {
          if (cancel) {
            this.goBack();
          }
        });
      });
    } else {
      this.goBack();
    }
  }

  goBack = () => {
    this.isCancelling = true;

    if (this.props.onCancel) {
      this.props.onCancel();
    }

    if (this.props.history) {
      if (this.props.reset && this.props.resetOnCancel === true) {
        this.props.reset();
      }

      this.props.history.goBack();
    }
  };

  render() {
    let {
      header,
      footer,
      entity,
      displayField,
      nameSingular,
      namePluralText,
      nameSingularText,
      title,
      submitting,
      dirty,
      pristine,
      invalid,
      ContentWrapper,
      handleSubmit,
      ignoreFormDirty,
      extraActions,
    } = this.props;

    let disableSubmit = invalid || submitting || pristine;
    if (ignoreFormDirty) {
      disableSubmit = false;
    }
    //disabled={submitting || !dirty}
    footer = footer ? (
      footer({ enableEdit: this.state.enableEdit, ...this.props })
    ) : (
      <div className="clearfix">
        <div className="pull-right">
          <Button className="btn btn-default ml" onClick={this.handleGoBack.bind(this)}>
            Cancel
          </Button>
          <Button type="submit" className="btn btn-primary" disabled={disableSubmit}>
            save
          </Button>
        </div>
        {extraActions}
      </div>
    );

    header = header || (
      <div>
        <h2>{nameSingularText}</h2>
        <h1>
          <span className="primary">{entity ? getDisplayValue(entity, displayField) : ''}</span>
        </h1>
      </div>
    );
    title = title || namePluralText;

    return (
      <ContentWrapper>
        <div className="content-heading">
          <Prompt
            when={!this.state.allowLeave && dirty && !this.isCancelling}
            message="You have pending changes not saved yet. Are you sure want to leave?"
          />
          {title}
          {this.props.enableSubtitle ? <small>{this.props.subtitle}</small> : ''}
          <small>
            <a onClick={this.handleGoBack.bind(this)}>
              <i className="fa fa-arrow-circle-left" />
              {'  '}
              Back
            </a>
          </small>
        </div>
        <Paper className={'adpe-entity' + (this.props.flags.loading ? ' whirl traditional' : '')}>
          <ValidationForm
            id={'formEdit' + nameSingular}
            onSubmit={handleSubmit(this.handleUpdate.bind(this))}
          >
            {this.props.children}
          </ValidationForm>
        </Paper>
      </ContentWrapper>
    );
  }
}

EntityEdit.defaultProps = {
  resetOnCancel: true,
};

EntityEdit.propTypes = {
  namePlural: PropTypes.string.isRequired,
  nameSingular: PropTypes.string.isRequired,
  namePluralText: PropTypes.string,
  nameSingularText: PropTypes.string,
  flags: PropTypes.array,
  enableSubtitle: PropTypes.bool,
  header: PropTypes.element,
  footer: PropTypes.func,
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  resetOnCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  entity: PropTypes.object.isRequired,
  ContentWrapper: PropTypes.element.isRequired
};

export default EntityEdit;
