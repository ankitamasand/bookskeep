import React, { Component } from 'react'
import { OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap'

export const ActionsMenu = ({ align, trigger, actions, id }) => {
    const popover = (
        <Popover id={`popover-positioned-${align}`}>
            <ListGroup bsClass='list-group custom-list-group'>
                {getListItems(actions, id)}
            </ListGroup>
        </Popover>
    )

    return (
        <OverlayTrigger
            trigger={trigger}
            placement={align}
            overlay={popover}>
            <div className='trigger'></div>
        </OverlayTrigger>
    )
}

const getListItems = (actions, id) => {
    return actions.map (a => {
        return (
            <ListGroupItem
                key={a.text}
                bsClass='list-group-item custom-list-group-item'
                onClick={(e) => a.onClick(e, id)}>
                {a.text}
            </ListGroupItem>
        )
    })
}
