import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import './TagsWidget.scss';

export const getUrl = (type, propName, value) => {};

const TagsWidget = ({ tags, className, history }) => {
  if (!tags) return <span />;
  const mainClassNames = cx('tags-widget', className);
  return (
    <div className={mainClassNames}>
      {tags.map((tag, index) => {
        let tagLink = tag.value ? getUrl(tag.type, null, tag.value) : null;
        const classNames = cx({
          'text-clickable': tagLink,
          pr: index > 0,
          pl: true,
          br2: index > 0,
        });

        if (tagLink)
          return (
            <Link to={tagLink}>
              <span key={index} className={classNames}>
                {tag.label}
              </span>
            </Link>
          );
        return (
          <span key={index} className={classNames}>
            {tag.label}
          </span>
        );
      })}
    </div>
  );
};

export default TagsWidget;
