import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig';

export async function GET() {
  try {
    // Check database connection
    const dbCheck = await db.execute('SELECT 1 as health');
    
    // Check environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
    ];
    
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: dbCheck ? 'healthy' : 'unhealthy',
        environment: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };
    
    // If any check fails, return unhealthy status
    const isHealthy = Object.values(healthStatus.checks).every(check => check === 'healthy');
    
    if (!isHealthy) {
      healthStatus.status = 'unhealthy';
      healthStatus.issues = {
        missingEnvVars: missingEnvVars.length > 0 ? missingEnvVars : undefined,
      };
    }
    
    return NextResponse.json(healthStatus, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      checks: {
        database: 'unhealthy',
        environment: 'unknown',
      },
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}