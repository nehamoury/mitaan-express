import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';

// Mock fetch
global.fetch = vi.fn();

const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('HeroSlider', () => {
    it('shows default content initially', () => {
        // Mock fetch to return nothing immediately
        fetch.mockImplementationOnce(() => new Promise(() => { }));
        renderWithRouter(<HeroSlider language="en" />);
        expect(screen.getByText('Welcome to Mitaan Express')).toBeInTheDocument();
    });

    it('renders slides after fetching data', async () => {
        const mockData = [
            {
                id: 1,
                title: 'Test Article',
                shortDescription: 'Test Description',
                image: 'test.jpg',
                isFeatured: true,
                status: 'PUBLISHED',
                category: { name: 'News' },
                slug: 'test-article'
            }
        ];

        fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        renderWithRouter(<HeroSlider language="en" />);

        await waitFor(() => {
            expect(screen.getByText('Test Article')).toBeInTheDocument();
        });
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('News')).toBeInTheDocument();
    });

    it('handles fetch error gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('API Error'));
        renderWithRouter(<HeroSlider language="en" />);

        // Should fallback to default slide
        await waitFor(() => {
            // The component logs error, but should render fallback slide
            expect(screen.getByText(/Mitaan Express/i)).toBeInTheDocument();
        });
    });
});
