export default ListModal;
declare class ListModal extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    handleSave: (closeModal: any) => void;
    handleOnRowSelectionChange: (selections: any) => void;
}
declare namespace ListModal {
    namespace propTypes {
        const columns: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const title: PropTypes.Requireable<string>;
        const dataTableTitle: PropTypes.Requireable<string>;
        const openEditInNewPage: PropTypes.Requireable<boolean>;
        const classes: PropTypes.Requireable<any>;
        const styles: PropTypes.Requireable<any>;
        const searchKeys: PropTypes.Validator<any[]>;
        const searchOptions: PropTypes.Requireable<PropTypes.InferProps<{
            searchUrl: PropTypes.Requireable<string>;
            expand: PropTypes.Requireable<string>;
            order: PropTypes.Requireable<string>;
            orderBy: PropTypes.Requireable<string>;
        }>>;
        const filters: PropTypes.Requireable<any[]>;
        const filterOptions: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const keyField: PropTypes.Validator<string>;
        const displayField: PropTypes.Validator<string | ((...args: any[]) => any)>;
        const namePlural: PropTypes.Validator<string>;
        const namePluralText: PropTypes.Requireable<string>;
        const nameSingular: PropTypes.Validator<string>;
        const nameSingularText: PropTypes.Requireable<string>;
        const searchResult: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const flags: PropTypes.Validator<object>;
        const actions: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const tableOptions: PropTypes.Requireable<object>;
        const buttonsOptions: PropTypes.Requireable<PropTypes.InferProps<{
            headerButtons: PropTypes.Requireable<boolean | object>;
            rowButtons: PropTypes.Requireable<boolean | object>;
            selectionButtons: PropTypes.Requireable<boolean | object>;
            contentButtons: PropTypes.Requireable<boolean | object>;
            dialogButtons: PropTypes.Requireable<boolean | object>;
        }>>;
        const selectRowOptions: PropTypes.Requireable<object>;
        const exportsService: PropTypes.Requireable<PropTypes.InferProps<{
            columns: PropTypes.Requireable<any[]>;
            fileName: PropTypes.Requireable<string>;
            pageTitle: PropTypes.Requireable<string>;
            namePlural: PropTypes.Requireable<string>;
        }>>;
        const open: PropTypes.Requireable<boolean>;
        const fullWidth: PropTypes.Requireable<any>;
        const maxWidth: PropTypes.Requireable<any>;
        const onClose: PropTypes.Requireable<(...args: any[]) => any>;
        const onSave: PropTypes.Requireable<(...args: any[]) => any>;
        const scroll: PropTypes.Requireable<string>;
        const ignoreFormValidation: PropTypes.Requireable<boolean>;
        const rowOptions: PropTypes.Requireable<any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
