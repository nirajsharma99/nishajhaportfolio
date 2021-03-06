import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'black',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '40px',
  },
}));
const Loader2 = ({ open }) => {
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default Loader2;
