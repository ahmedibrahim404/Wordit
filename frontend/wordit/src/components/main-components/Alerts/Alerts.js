import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default class Alerts extends React.Component {

    constructor(props){
        super(props);
        this.alerts = ['error', 'warning', 'success'];
        this.state = {
            message:'ERROR 404: Not FOUND',
            alertType: 0,
            visible:false,
            TIME_TO_CLOSE_ALERT:3000
        }

        this.openAlert = this.openAlert.bind(this);
    }

    openAlert(alertType, alertMessage){
        this.setState({
            alertType,
            message:alertMessage,
            visible:true
        });

        setTimeout(() => this.closeAlert(), this.state.TIME_TO_CLOSE_ALERT);
    }

    closeAlert(){
        this.setState({
            visible:false,
            message:null
        });
    }

    componentDidUpdate(prevProps){
        if(this.state.visible === true || !this.props.alertMessage || this.props.alertMessage == prevProps.alertMessage) return;
        this.openAlert(this.props.alertType, this.props.alertMessage);     
    }

    render(){
        if(this.state.visible) return (
        <Stack sx={{ width: '40%', position:'fixed', bottom:'10px', left:'10px', zIndex:'5' }} spacing={2}>
            <Alert severity={this.alerts[this.state.alertType]}>{this.state.message}</Alert>
        </Stack>      
        );

        return (null);
    }
}