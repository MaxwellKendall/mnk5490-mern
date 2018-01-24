import { connect } from 'react-redux';
import * as actions from '../actions/<%= actionName %>';
import <%= componentName %> from '../components/<%= componentName %>';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(<%= componentName %>);
