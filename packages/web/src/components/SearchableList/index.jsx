/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  ListItemIcon,
  Chip,
  InputAdornment,
  Checkbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';
import update from 'immutability-helper';
import _ from 'lodash';
import searchableListStyle from './searchableListStyle';
import { getPropertyValue } from '@tabtabgo/core/utilities';
class SearchableList extends Component {
  static propTypes = {
    classes: PropTypes.any,
    isMulti: PropTypes.bool,
    onItemsSelected: PropTypes.func,
    listItemAction: PropTypes.node,
    searchKey: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
    fields: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      primary: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        primary: PropTypes.string.isRequired,
        avatarLabel: PropTypes.string,
        secondary: PropTypes.string,
        avatar: PropTypes.node,
        icon: PropTypes.node,
        action: PropTypes.node,
      }),
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selected: props.value ? (_.isArray(props.value) ? props.value : [props.value]) : [],
      items: [],
      searchKey: props.searchKey,
      searchTextValue: '',
      currentPage: 0,
      hasNextPage: true,
      errorMessage: null,
    };
  }
  componentDidMount() {
    if (this.state.items.length === 0) this.handleSearch();
  }
  handleSelectItem = (value) => {
    const { isMulti, onItemsSelected } = this.props;
    let selectedItems = this.state.selected;
    const existValueIndex = selectedItems.findIndex((s) => _.isEqual(s, value));
    if (existValueIndex === -1) {
      if (isMulti) {
        selectedItems = selectedItems.concat([value]);
      } else {
        selectedItems = [value];
      }
      this.setState({ selected: selectedItems });
      if (onItemsSelected) {
        onItemsSelected(selectedItems);
      }
    } else {
      this.handleDeleteSelected(value, existValueIndex);
    }
  };

  isSelected = (value) => {
    const { selected } = this.state;
    return selected.findIndex((s) => _.isEqual(s, value)) > -1;
  };

  handleChangeSearchText = (e) => {
    this.setState({ searchTextValue: e.target.value }, () => this.handleSearch());
  };

  handleSearch = (getNextPage = false, page = 0) => {
    const { onSearch } = this.props;
    const { searchTextValue, searchKey } = this.state;
    if (onSearch) {
      this.setState({ isLoading: true });
      onSearch(searchTextValue, searchKey, page)
        .then((result) => {
          this.setState({
            items: getNextPage ? this.state.items.concat(result.items) : result.items,
            hasNextPage: result.hasNextPage,
            currentPage: result.page,
            isLoading: false,
            errorMessage: null,
          });
        })
        .catch((error) => {
          this.setState({ isLoading: false, errorMessage: error.message });
          console.error(error);
        });
    }
  };

  handleDeleteSelected = (item, index) => {
    let newSelectedItems = update(this.state.selected, { $splice: [[index, 1]] });
    this.setState({
      selected: newSelectedItems,
    });
    if (this.props.onItemsSelected) {
      this.props.onItemsSelected(newSelectedItems);
    }
  };

  handleNextPage = (page) => {
    // console.log("Load Next Page");
    this.handleSearch(true, page);
  };

  getProperty = (propName, item) => {
    const { fields } = this.props;
    var propPath = fields[propName];
    if (propPath) {
      if (typeof propPath === 'function') {
        return propPath(item);
      }
      if (typeof propPath === 'string') {
        return getPropertyValue(item, propPath);
      }
    }
    return null;
  };

  getAvatar = (item) => {
    return this.getProperty('avatar', item);
  };

  getLabel = (item) => {
    var label = this.getProperty('label', item);
    if (label) return label;
    return this.getPrimary(item);
  };

  getPrimary = (item) => {
    return this.getProperty('primary', item);
  };

  getIcon = (item) => {
    return this.getProperty('icon', item);
  };

  getSecondary = (item) => {
    return this.getProperty('secondary', item);
  };

  render() {
    const { classes, listItemAction, searchKey, isMulti } = this.props;
    const { items, hasNextPage, selected, isLoading } = this.state;
    let ListItemAction = listItemAction;
    if (!ListItemAction && isMulti) {
      ListItemAction = Checkbox;
    }

    return (
      <Grid container direction="column">
        <Grid item>
          <TextField
            id="standard-name"
            label={
              searchKey && searchKey.field.label ? `Search in ${searchKey.field.label} ` : 'Search'
            }
            className={classes.textField}
            value={this.state.searchTextValue}
            onChange={this.handleChangeSearchText.bind(this)}
            fullWidth
            autoFocus
            margin="none"
            InputProps={{
              classes: {
                root: classes.inputContainer,
                input: classes.input,
              },
              startAdornment: (
                <InputAdornment position="start" className={classes.valueContainer}>
                  {selected
                    ? selected.map((item, index) => {
                        let chipProps = {
                          key: index,
                          label: this.getLabel(item),
                        };
                        var avatar = this.getAvatar(item);
                        if (avatar) {
                          chipProps.avatar = <Avatar src={avatar} />;
                        }
                        return (
                          <Chip
                            key={index}
                            className={classes.chip}
                            color="primary"
                            onDelete={this.handleDeleteSelected.bind(this, item, index)}
                            {...chipProps}
                          />
                        );
                      })
                    : null}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <List className={classes.list}>
            <InfiniteScroll
              pageStart={0}
              //dataLength={items.length} //This is important field to render the next data
              loadMore={this.handleNextPage.bind(this)}
              initialLoad={false}
              hasMore={hasNextPage}
              loader={isLoading ? <h4 key={0}>Loading...</h4> : null}
              useWindow={false}
            >
              {items ? (
                items.map((item, index) => (
                  <ListItem key={index} button onClick={() => this.handleSelectItem(item)}>
                    {this.getAvatar(item) && (
                      <ListItemAvatar>
                        <Avatar alt={this.getLabel(item)} src={this.getAvatar(item)} />
                      </ListItemAvatar>
                    )}
                    {this.getIcon(item) && <ListItemIcon>{this.getIcon(item)}</ListItemIcon>}
                    <ListItemText
                      primary={this.getPrimary(item)}
                      secondary={this.getSecondary(item)}
                    />
                    {ListItemAction && (
                      <ListItemSecondaryAction>
                        <ListItemAction
                          onChange={() => this.handleSelectItem(item)}
                          checked={this.isSelected(item)}
                        />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))
              ) : (
                <div />
              )}
            </InfiniteScroll>
          </List>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(searchableListStyle)(SearchableList);
