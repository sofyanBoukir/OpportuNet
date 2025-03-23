import React from 'react'
import { Button } from '../UI/Button'
import { MapPinIcon } from '@heroicons/react/24/outline'

export const JobDetails = () => {
  return (
    <div className='bg-white px-6 py-5 border border-gray-300 shadow-md w-[100%] rounded-md'>
        <div>
            <h1 className='text-3xl font-semibold'>Server-side developer</h1>
            <div className='flex gap-2 text-gray-700'>
                <span className='text-lg'>Capegemeni - </span>
                <span className='text-lg'>Rabat, Morocco</span>
            </div>
            <div className='mt-1'>
                <span className='px-3 font-semibold py-1 rounded-md bg-[#ede9e6]'>Full-time</span>
            </div>
            <div className='mt-3'>
                <Button text={'Aplly now'} className={'bg-[#164081] text-white'}/>
            </div>
        </div>
        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>Location</h1>
            <div className='flex gap-1 text-gray-700 mt-2'>
                <MapPinIcon className='w-5 h-5'/>
                <span>Rabat, morocco</span>
            </div>
        </div>

        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>Job description</h1>
            <div className='flex gap-1 text-gray-700 mt-2'>
                <span>Crouzet, acteur majeur dans le secteur industriel, propose un stage en développement informatique au sein de son équipe technique.<br></br><br></br>
                En tant que stagiaire IT, le candidat contribuera au développement et à l’optimisation des plateformes d’agents IA et des systèmes RAG. Il bénéficiera d’une expérience pratique sur les grands modèles de langage (LLMs), les systèmes de récupération de connaissances et les outils d’automatisation.
                </span>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Responsibilities</h1>
                <ul className='ml-10 list-disc text-gray-700 flex flex-col gap-2 mt-1'>
                    <li>Co-développer des agents IA permettant d’automatiser les flux de travail, de traiter des documents et d’améliorer la prise de décision.</li>
                    <li>Implémenter des systèmes RAG pour améliorer la récupération des connaissances et la qualité des réponses générées par l’IA.</li>
                    <li>Intégrer des systèmes IA aux outils métiers existants (CRM, ERP, Google Workspace, WhatsApp, etc.).</li>
                    <li>Participer à l’élaboration de solutions low-code/no-code pour faciliter l’adoption de l’IA.</li>
                </ul>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Skills</h1>
                <ul className='ml-10 list-disc text-gray-700 flex flex-col gap-2 mt-1'>
                    <li>Javascript</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>Laravel</li>
                </ul>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Salary range</h1>
                <p className='text-gray-700 ml-10 mt-1'>From 7000dhs/mois to 10000dhs/mois</p>
            </div>
        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        </div>
    </div>
  )
}
