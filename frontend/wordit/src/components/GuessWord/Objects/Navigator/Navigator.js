import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Navigator(Component) {
    return function Navigate(props) {
        const navigation = useNavigate();
        return <Component {...props} myNavigation={navigation} />;
    }
}