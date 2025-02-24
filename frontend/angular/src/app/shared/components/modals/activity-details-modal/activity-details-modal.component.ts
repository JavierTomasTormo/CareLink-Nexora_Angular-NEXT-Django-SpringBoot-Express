import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
    id: number;
    name_activitie: string;
    description: string;
    isactive: number;
    slug: string;
    activity_type: number;
    capacity: number;
    caracteristics: string[];
    createdat: string;
    duration: number;
    id_day: number;
    id_dayoftheweek: number;
    id_hour: number;
    id_month: number;
    id_year: number;
    intensity: number;
    max_participants: number;
    price: string;
    updatedat: string;
}

@Component({
    selector: 'app-activity-details-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="isOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden transform transition-all">
                <!-- Header -->
                <div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-slate-700 to-slate-900">
                    <h3 class="text-2xl font-bold text-white tracking-wide">{{activity?.name_activitie}}</h3>
                    <button (click)="close()" class="text-gray-300 hover:text-white transition duration-200 p-2">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="p-8 space-y-6 bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- Left Column -->
                        <div class="space-y-6">
                            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <i class="fas fa-info-circle mr-2 text-slate-700"></i>
                                    Información General
                                </h4>
                                <div class="space-y-4">
                                    <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition">
                                        <i class="fas fa-clock text-slate-700"></i>
                                        <span class="text-gray-800">Duración: {{activity?.duration}} minutos</span>
                                    </div>
                                    <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition">
                                        <i class="fas fa-users text-slate-700"></i>
                                        <span class="text-gray-800">Capacidad: {{activity?.max_participants}} participantes</span>
                                    </div>
                                    <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition">
                                        <i class="fas fa-euro-sign text-slate-700"></i>
                                        <span class="text-gray-800">Precio: {{activity?.price}}€</span>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <i class="fas fa-tags mr-2 text-slate-700"></i>
                                    Características
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <span *ngFor="let carac of activity?.caracteristics" 
                                            class="bg-slate-100 text-slate-700 px-4 py-2 rounded-md text-sm font-medium">
                                        {{carac}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="space-y-6">
                            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <i class="fas fa-align-left mr-2 text-slate-700"></i>
                                    Descripción
                                </h4>
                                <p class="text-gray-700 leading-relaxed">{{activity?.description}}</p>
                            </div>

                            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <i class="fas fa-chart-line mr-2 text-slate-700"></i>
                                    Nivel de Intensidad
                                </h4>
                                <div class="flex gap-2">
                                    <i *ngFor="let i of [1,2,3,4,5]" 
                                        class="fas fa-fire text-xl" 
                                        [ngClass]="i <= (activity?.intensity ?? 0) ? 'text-red-600' : 'text-gray-200'">
                                    </i>
                                </div>
                                <p class="text-sm text-gray-600 mt-3 font-medium">
                                    Nivel {{activity?.intensity}}/5 - {{getIntensityLabel(activity?.intensity ?? 0)}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="px-8 py-4 border-t border-gray-200 bg-white flex justify-end">
                    <button (click)="close()" 
                            class="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition duration-200 flex items-center">
                        <i class="fas fa-times mr-2"></i>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `
})
export class ActivityDetailsModalComponent {
    @Input() activity?: Activity;
    @Input() isOpen: boolean = false;
    @Output() closeModal = new EventEmitter<void>();

    getIntensityLabel(intensity: number): string {
        const labels: { [key: number]: string } = {
            1: 'Muy Suave',
            2: 'Suave',
            3: 'Moderada',
            4: 'Intensa',
            5: 'Muy Intensa'
        };
        return labels[intensity] || 'No especificada';
    }

    close(): void {
        this.closeModal.emit();
    }
}