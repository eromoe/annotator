import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

import {
  Icon,
  IconToggle,
} from 'react-mdc-web'

const styles = (theme) => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

function corpusLink(corpusId) {
  return `/corpus/${corpusId}`;
}

class CorpusTable extends React.PureComponent {

  render(){
    const {corpusList} = this.props;

    return (
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
                  {/* <Icon name="keyboard_arrow_right" /> */}
                  <Link to={corpusLink(n.id)} >查看</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

}

// CorpusTable.propTypes = {
//   corpusList: PropTypes.array.isRequired,
// };


export default CorpusTable;
