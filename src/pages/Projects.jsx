import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import GreyBoxProjects from "../components/GreyBoxProjects";

import "../styles/About.css"



function Projects() {
    useEffect(() => {
      document.title = "Projects";
    }, []);

    return (
          <>
            <div className="true-center blue-color">
                <h1>This page is dedicated to my projects!</h1>
            </div>

            {/* Under construction */}
            <div className="true-center blue-color" style={{ display: "flex", gap: "10pt", marginTop: "20pt" }}>
                <i className="fa-solid fa-person-digging" style={{ fontSize: "20pt", marginRight: "-10pt" }}></i>
                <h2 className="blue-color"></h2>
                <h2 className="blue-color">Page is under construction</h2>
                <i className="fa-solid fa-tools" style={{ fontSize: "20pt" }}></i>
            </div>


            {/* Master's in Computer Engineering */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h1 style={{ marginLeft: "-23pt" }}>Master's in Computer Engineering</h1>
              <div style={{display: "flex", marginLeft : "-396pt", marginTop: "-40pt"}}>
                <h3>Specialization: AI, Vision and Sound</h3>
              </div>
            </div>

            <div style={{marginTop: "-20pt"}}>
              <GreyBoxProjects title="3rd Semester: CERN Internship" 
                              description="Designing and verifying neural network–based control systems, with a focus on implementation and formal verification to ensure reliability and safety."
                              abstract="TDB">
              </GreyBoxProjects>
            </div>

            <GreyBoxProjects title="2nd Semester: Personal Sound Zones for Smartphones" 
                              description="Deep learning-based sound zone control system for smartphones to enhance phone call privacy in public spaces, using only native loudspeakers and microphones, trained on synthetically generated room impulse responses."
                              abstract="In public spaces, phone conversations can pose both a privacy concern and contribute to noise pollution. This project investigates a novel deep learning-based method for achieving sound zone control using only the native loudspeakers and microphones on a smartphone, without requiring room impulse response measurements during filter generation. The goal is to create a bright zone around the phone user and a dark zone in the surrounding area, thereby improving privacy and reducing unwanted noise leakage. Several classical sound zone control methods from existing literature were implemented to serve as baselines. In parallel, two neural network models were developed to explore what can be learned from limited input, and trained entirely on synthetically generated room impulse responses. The models were evaluated against the optimal baselines, yet still demonstrated performance approaching that of the analytically optimized filters. Notably, the best model achieved an average acoustic contrast of 32.48 dB while preserving intelligibility in the bright zone.">
            </GreyBoxProjects>

            <GreyBoxProjects title="1st Semester: Point Cloud Segmentation of Agricultural Vehicles using 3D Gaussian Splatting" 
                              description="Development of a synthetic data generation pipeline utilizing 3D Gaussian Splatting for vehicle mesh extraction and a simulated environment with a highly customizable LiDAR sensor for data generation."
                              abstract="Training neural networks for tasks such as 3D point cloud semantic segmentation demands extensive datasets, yet obtaining and annotating real-world point clouds is costly and labor-intensive. This work aims to introduce a novel pipeline for generating realistic synthetic data, by leveraging 3D Gaussian Splatting (3DGS) and Gaussian Opacity Fields (GOF) to generate 3D assets of multiple different agricultural vehicles instead of using generic models. These assets are placed in a simulated environment, where the point clouds are generated using a simulated LiDAR. This is a flexible approach that allows changing the LiDAR specifications without incurring additional costs. We evaluated the impact of synthetic data on segmentation models such as PointNet++, Point Transformer V3, and OACNN, by training and validating the models only on synthetic data. Remarkably, the PTv3 model had an mIoU of 91.35%, a noteworthy result given that the model had neither been trained nor validated on any real data. Further studies even suggested that in certain scenarios the models trained only on synthetically generated data performed better than models trained on real-world data. Finally, experiments demonstrated that the models can generalize across semantic classes, enabling accurate predictions on mesh models they were never trained on."
                              link="https://arxiv.org/abs/2506.05009">
            </GreyBoxProjects>


            {/* Bachelor's in Robotics */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{ marginLeft: "-241pt" }}>Bachelor's in Robotics</h1>
            </div>

            <div style={{marginTop: "-30pt"}}>
              <GreyBoxProjects title="6th Semester: Examination of Visual Servoing Techniques For Vertical Farming" 
                                description="Investigation of both more traditional analytical approaches and modern deep-learning based visual servoing techniques for vertical farming enviroments in collaboration with Seasony."
                                abstract="Vertical farming is an emerging method in the farming industry. Vertical farming allows for controlling environment variables for the crops to a much higher degree, and enables for an easy robotics integration, such that labor intensive tasks can be automated. The following project is based on a company collaboration with Seasony. The project goal was to create a visual servoing algorithm, such that the robot Watney C could be properly aligned with a rack, in a vertical farming setup. Four different visual servoing algorithms were made, three based on traditional visual servoing techniques, and one based on the implementation of a convolutional neural network. This approach, based on a convolutional neural network, provided the best results, by satisfying the most requirements, and achieving an accuracy of 99.80% for the most demanding task, which was to properly align the robot on the global Z-axis, where a precision of ±8.5 mm was required.">
              </GreyBoxProjects>
            </div>

            <GreyBoxProjects title="5th Semester: Bimanual Manipulation with an Integrated Large Language Model" 
                              description="Bimanual manipulation system using two Kuka IIWA 7 manipulators, controlled via natural language by utilizing an LLM in combination with AI agents for adaptive task execution."
                              abstract="Bimanual manipulation is an evolving part of robotics. Using two manipulators together in a joint action allows the system to solve complex tasks otherwise unfeasible by a single-armed manipulator, such as laundry folding, opening a jar of jam, etc. To make the most of the bimanual system, a degree of intelligence was desired. Specifically, object detection to locate and classify objects, as well as a Large Language Model to convert natural language prompts to specific commands for the bimanual system. The system is comprised of two Kuka iiwa 7 R800s, a Robotiq 3-finger adaptive gripper, and an Intel RealSense D435. The object detection algorithm implemented is YOLOv8, and the Large Language Model used is ChatGPT-4-1106-preview. The final system could not display fully working goal-oriented bimanual manipulation, as only a single gripper was mounted. It was, however, able to emulate it without an actual gripper. When tested, the Large Language model showed a task success rate of 73%, while the vision system had a mean precision of 0.61.">
            </GreyBoxProjects>

            <GreyBoxProjects title="4th Semester: Position control for Crazyflie 2.1 drone utilizing Vicon Motion" 
                              description="Development of a position control system for the Crazyflie 2.1 drone using Vicon Motion Capture system."
                              abstract="Precision farming is one of many new innovations in the field of farming. This project focuses on developing a control system for a scaled down farming-drone, which should be able to ascend/descend, hover, and fly around. A control system for the Crazyflie 2.1 drone developed by Bitcraze is proposed, which by the use of a cascading control loop and Vicon motion system, is able to control the x, y and z-position of the Crazyflie, such that preplanned trajectories can be implemented and executed. The system is able to accurately manoeuvre around with a steady-state error and a standard deviation of 1.87 mm for the x-axis, 1.98 mm for the y-axis and 7 mm for the z-axis. Furthermore, settling times of the system when using a step response and a pre-planned trajectory were examined, which revealed that the settling time with a trajectory resulted in a shorter settling time. Finally, the overshoot of the system was examined, and it was determined that, on average, the overshoot of the system was 4.21%. Despite the overshoot, the drone could complete a scenario emulating flying over a field.">
            </GreyBoxProjects>

            <GreyBoxProjects title="3rd Semester: Handtracking for a robot-to-human handover in the packaging industry" 
                              description="Robot-to-Human handover system for a collaborative robot using a UR10 robot and a Kinect V2 camera."
                              abstract="Work-related repetitive strain injuries are a prevalent problem in repetitive work environments. This project focuses on the parcel packaging work environment and proposes a hand-tracking subsystem for a complete robotic solution intended to reduce repetitive motion. This proposal includes handtracking of the worker using the Kinect V2 camera, and the process of moving a UR10 manipulator to the tracked hand. The hand-tracking is implemented using a combination of background subtraction, BLOB classification, and lastly, color thresholding. However it is necessary for the operator to wear a colored glove. The proposed system has a 100% recognition rate when initiating a handover, the system could detect the operator’s glove 97.54% of the time, and for 86% of the handover locations, the calculated distance was within 5cm of the correct handover location.">
            </GreyBoxProjects>
            
            <GreyBoxProjects title="2nd Semester: Robotic manipulators in the healthcare sector" 
                              description="Kinematic modeling and trajectory generation for assisting individuals with impairments using the Kinova Jaco collaborative robot."
                              abstract="The following report focuses on issues regarding patients suffering from C5 tetraplegia having issues completing activities of daily living. The usage of robotic solutions are rapidly growing, and their utilization are widespread. One of the sectors where automation is becoming more of a common application, is within healthcare. An analysis is made to ascertain the damage that a spinal cord injury can inflict on a patient, after which a market analysis is carried out to figure out which robotic devices can be helpful to the patient. The report then proposes a solution of using the healthcare robot, Kinova Jaco Gen 2, equipped with a 2-finger gripper, to help patients suffering from C5 tetraplegia in completing the ADL of pouring water into a glass. To complete the ADL, a forward and inverse kinematic model was derived and utilized to set up a joint-trajectory planing; which was then simulated using MATLAB, where the user could determine when to move the Jaco, when to pour, and when to stop pouring.">
            </GreyBoxProjects>
            



            <div>
                <Link to="/" className="icon-link">
                <i className="fa-solid fa-arrow-left" style={{ fontSize: "15pt" }}></i>
                <p>Go back to Home</p>
                </Link>
            </div>

            {/* Footer */}
            <div className="true-center">
              <Footer/>
            </div>
          </>
    );
  }
  
  export default Projects;