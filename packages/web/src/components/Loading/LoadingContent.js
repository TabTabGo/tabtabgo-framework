import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-bootstrap';
import ContentWrapper from '../../layout/ContentWrapper';
import ShareWidget from '../ShareWidget';
import TagsWidget from '../TagsWidgets';

import LoadingTextShape from './LoadingTextShape';
import LoadingTextParagraph from './LoadingTextParagraph';

class LoadingContent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { title, subTitle, tags, history } = this.props;
    return (
      <div className="content-page">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ContentWrapper>
          <div className="mt">
            {title ? (
              <h1>{title}</h1>
            ) : (
              <h1>
                <LoadingTextShape />
              </h1>
            )}
            {subTitle ? (
              <h2 className="mt">{subTitle}</h2>
            ) : (
              <h2 className="mt">
                <LoadingTextShape />
              </h2>
            )}
            {tags ? (
              <TagsWidget tags={tags} history={history} />
            ) : (
              <h4 className="mt-lg">
                <LoadingTextShape />
              </h4>
            )}
            <div className="content-body mt-xl">
              <div>
                <Row>
                  <Col sm={12}>
                    <LoadingTextParagraph />
                    <LoadingTextParagraph className="mt-xl" />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

export default LoadingContent;
