import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

function corpusLink(corpusId) {
  return `/corpus/${corpusId}`;
}

function CorpusTable(props) {
  const {classes, corpusList} = props;

  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名称</TableCell>
            <TableCell>说明</TableCell>
            <TableCell numeric>文档数</TableCell>
            <TableCell numeric>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corpusList && corpusList.map((n) => {
            return (
              <TableRow key={n.id}>
                <TableCell>
                  {n.name}
                </TableCell>
                <TableCell>
                  {n.desc}
                </TableCell>
                <TableCell numeric>
                  0
                </TableCell>
                <TableCell numeric>
                  <Link to={corpusLink(c.id)} ><Icon name="keyboard_arrow_right"></Icon></Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
