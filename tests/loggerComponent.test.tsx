import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Logger from 'src/pages/app-logger/index'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

describe('Logger Page', () => {
    const queryClient = new QueryClient();
    it('renders a heading', () => {
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <Logger />
            </QueryClientProvider>
        );
        expect(container.querySelector('h5')).not.toBeNull();
        expect(container.querySelector('h5')?.textContent).toEqual('Logger Search');

    })
})
