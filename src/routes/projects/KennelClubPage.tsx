import React from 'react';
import { KennelClub } from '../../components/projects/kennel-club/KennelClub';
import { useTitle } from '../../hooks';
import { Link } from 'react-router-dom';

const KennelClubPage: React.FC = () => {
    useTitle('alts-alt | Kennel Club');

    return (
        <div className='flex w-full flex-col gap-y-8'>
            <KennelClub />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
                <p>I wanted to make a webring for my friends! And for whatever reason, I wanted all the websites to be represented by little creatures running around all over the place. This is that! If you refresh the page, the kennel should update with the little critters moving around and following each other and whatnot. (Maybe I&apos;ll get around to live updating it who knows.)</p>
                <p>If you want to join the webring, check out the instructions on <Link className='text-enabled hover:underline hover:underline-offset-2' target='_blank' rel='noopener noreferrer' to='https://github.com/a1ts-a1t/kennel-club/CONTRIBUTING.md'>github</Link>.</p>
                <p>Happy webring-ing!</p>
            </div>
        </div>
    );
};

export default KennelClubPage;

