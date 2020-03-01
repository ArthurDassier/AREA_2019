import React from 'react';
import {
    Button,
    Card,
    Typography
} from '@material-ui/core';

export default function MyCard(props) {
    let bool = false;
    if ('doNext' in props) { bool = true; }

    return (
        <Card className="blurred-card">
            <Typography component="h1" variant="h4" style={{ "marginTop": "20px", "marginBottom": "20px" }}>
                {props.title}
            </Typography>
            {props.content}
            <div>
                <Button color="secondary" onClick={props.doBack}>
                    {props.backText}
                </Button>
                {bool && (
                    <Button color="primary" onClick={props.doNext} disabled={!props.canPressNext}>
                        {props.nextText}
                    </Button>
                )}
            </div>
        </Card>
    )
}