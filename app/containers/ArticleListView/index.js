import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';


class NodeListItem extends Component {

  constructor(props) {
    super(props)
    // this.props.selected = false
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selected: false
    }
  }

  componentDidMount() {
    const { info , actions} = this.props
  }

  handleClick(e) {
    e.preventDefault()
    console.log('fileitem state:', this.state)
    this.setState({selected: !this.state.selected})

  }

  render() {
    const { info , actions, index} = this.props

    return (
      <div
        className={classNames('file-list-item', 'row', { 'selected': this.state.selected})}
        aria-label={info.name}
        onClick={this.handleClick}
        ref="fileItem" >
        <p className={classNames('file-name')} >{this.showNodeName()}</p>
      </div>
    );
  }
}


export default class NodeListView extends Component {

  constructor(props) {
    super(props)

    this.deleteSelectedNodes = this.deleteSelectedNodes.bind(this)
    this.moveSelectedNodes = this.moveSelectedNodes.bind(this)
    this.copySelectedNodes = this.copySelectedNodes.bind(this)
    this.addSelectedNodes = this.addSelectedNodes.bind(this)
    this.addCurrentNode = this.addCurrentNode.bind(this)

  }

  addSelectedNodes() {
    let {info, actions} = this.props
      singleConfirm('Are you sure?', () => {
        actions.addNodes(nodes)
      })
  }

  deleteSelectedNodes() {
    let {info, actions} = this.props

    this.props.fileList.forEach( f=> {
      console.log(f.state.selected)
    })

    let fliststate = this.props.fileList.map(f=> {
      [f.path, f.state.selected]
    })

    console.log(fliststate)

    singleConfirm('Are you sure?', () => {
      actions.deleteNodes(nodes)
    })
  }

  moveSelectedNodes() {
    let {info, actions} = this.props
      singleConfirm('Are you sure?', () => {
        actions.addNodes(nodes)
      })
  }

  copySelectedNodes() {
    let {info, actions} = this.props
      singleConfirm('Are you sure?', () => {
        actions.addNodes(nodes)
      })
  }

  addCurrentNode() {
    let {info, actions} = this.props
      singleConfirm('Are you sure?', () => {
        actions.addNodes(nodes)
      })
  }

  render() {
    const { fileList, actions } = this.props
    console.log('NodeListView.render:',this.props)

    return (
      <div className='file-list-container' >
        <div className="file-list-header">
          <a  className="delete-btn btn" onClick={this.deleteSelectedNodes}>删除</a>
          <a  className="move-btn btn" onClick={this.moveSelectedNodes}>移动</a>
          <a  className="copy-btn btn" onClick={this.copySelectedNodes}>复制</a>
          <a  className="add-selected-btn btn" onClick={this.addSelectedNodes}>添加选中项到备份列表</a>
          <a  className="add-current-btn btn" onClick={this.addCurrentNode}>添加当前文件夹到备份列表</a>
        </div>
        {fileList && fileList.map((info) => <NodeListItem key={info.path} hash={md5string(info.path)} actions={actions} info={info} />)}
      </div>
    );
  }
}