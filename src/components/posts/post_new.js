import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from '../../actions';

class NewPost extends Component {
    renderField(field){
        const { meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className}>
                <label> {field.label}  </label>
                <input
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');

        });

    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title"
                       label="Title"
                       component={this.renderField}
                       type="text"
                />
                <Field  name="categories"
                        label="Categories"
                        component={this.renderField}
                        type="text"
                />
                <Field name="content"
                        label="Post Content"
                        component={this.renderField}
                        type="text"
                />
                <button type="submit" className="btn btn-primary"> Submit </button>
                <Link to="/" type="cancel" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    // Validate inputs from values
    if(!values.title) {
        errors.title = "Enter a title."
    }
    if(!values.categories) {
        errors.categories = "Enter some categories."
    }
    if(!values.content) {
        errors.content = "Enter some content."
    }

    // if errors isEmpty(), the form is fine to submit
    // if errors has *any* properties, redux form assumes is invalid.
    // We really care if a user has entered some valid input.
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(NewPost)
)