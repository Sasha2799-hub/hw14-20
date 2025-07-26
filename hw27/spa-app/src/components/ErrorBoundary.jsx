import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
        };
    } 
    componentDidCatch(error, errorInfo){
        console.log(error,errorInfo );
        this.setState({hasError:true})
    }
    render () {
        if(this.state.hasError){
            return(
            <>
                <p>This page doesnt work please return to the main page:</p>
                <a href="/">Main Page </a>
            </>
            )


        }
        return this.props.children
    }   

}
export default ErrorBoundary