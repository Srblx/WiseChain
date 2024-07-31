import PropTypes from 'prop-types';

const Label = ({
  htmlFor,
  children,
  className,
  required,
  disabled,
  error,
}: any) => {
  const baseClass = 'label';
  const classes = [
    baseClass,
    className,
    disabled ? `${baseClass}--disabled` : '',
    error ? `${baseClass}--error` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
      {required && <span className={`${baseClass}__required`}>*</span>}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  required: false,
  disabled: false,
  error: false,
};

export default Label;
